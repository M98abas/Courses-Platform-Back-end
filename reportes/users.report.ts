import { PrismaClient } from "@prisma/client";
import { reportEmail } from "../utils/emailSending/sender";

const prisma = new PrismaClient();

const report = async () => {
  const data: any = await prisma.constractors.findMany({
    select: {
      email: true,
      name: true,
      nickName: true,
      refererCode: true,
      contactWith: true,
    },
  });
  if (data.length != 0) reportEmail(data, "hussoss96@gmail.com", "Daily Report");
};

export default report;
