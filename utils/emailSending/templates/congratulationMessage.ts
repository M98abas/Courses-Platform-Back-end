const template = (user: any) => {
  return `
  <!DOCTYPE html>
    <html ⚡4email data-css-strict>
      <head>
        <meta charset="utf-8" />
        <style amp4email-boilerplate>
          body {
            visibility: hidden;
          }
        </style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp-custom>
          .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
          }
          body {
            width: 100%;
            font-family: arial, "helvetica neue", helvetica, sans-serif;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0px;
          }
          table td,
          body,
          .es-wrapper {
            padding: 0;
            margin: 0;
          }
          .es-content,
          .es-header,
          .es-footer {
            table-layout: fixed;
            width: 100%;
          }
          p,
          hr {
            margin: 0;
          }
          h1,
          h2,
          h3,
          h4,
          h5 {
            margin: 0;
            line-height: 120%;
            font-family: arial, "helvetica neue", helvetica, sans-serif;
          }
          .es-left {
            float: left;
          }
          .es-right {
            float: right;
          }
          .es-p5 {
            padding: 5px;
          }
          .es-p5t {
            padding-top: 5px;
          }
          .es-p5b {
            padding-bottom: 5px;
          }
          .es-p5l {
            padding-left: 5px;
          }
          .es-p5r {
            padding-right: 5px;
          }
          .es-p10 {
            padding: 10px;
          }
          .es-p10t {
            padding-top: 10px;
          }
          .es-p10b {
            padding-bottom: 10px;
          }
          .es-p10l {
            padding-left: 10px;
          }
          .es-p10r {
            padding-right: 10px;
          }
          .es-p15 {
            padding: 15px;
          }
          .es-p15t {
            padding-top: 15px;
          }
          .es-p15b {
            padding-bottom: 15px;
          }
          .es-p15l {
            padding-left: 15px;
          }
          .es-p15r {
            padding-right: 15px;
          }
          .es-p20 {
            padding: 20px;
          }
          .es-p20t {
            padding-top: 20px;
          }
          .es-p20b {
            padding-bottom: 20px;
          }
          .es-p20l {
            padding-left: 20px;
          }
          .es-p20r {
            padding-right: 20px;
          }
          .es-p25 {
            padding: 25px;
          }
          .es-p25t {
            padding-top: 25px;
          }
          .es-p25b {
            padding-bottom: 25px;
          }
          .es-p25l {
            padding-left: 25px;
          }
          .es-p25r {
            padding-right: 25px;
          }
          .es-p30 {
            padding: 30px;
          }
          .es-p30t {
            padding-top: 30px;
          }
          .es-p30b {
            padding-bottom: 30px;
          }
          .es-p30l {
            padding-left: 30px;
          }
          .es-p30r {
            padding-right: 30px;
          }
          .es-p35 {
            padding: 35px;
          }
          .es-p35t {
            padding-top: 35px;
          }
          .es-p35b {
            padding-bottom: 35px;
          }
          .es-p35l {
            padding-left: 35px;
          }
          .es-p35r {
            padding-right: 35px;
          }
          .es-p40 {
            padding: 40px;
          }
          .es-p40t {
            padding-top: 40px;
          }
          .es-p40b {
            padding-bottom: 40px;
          }
          .es-p40l {
            padding-left: 40px;
          }
          .es-p40r {
            padding-right: 40px;
          }
          .es-menu td {
            border: 0;
          }
          s {
            text-decoration: line-through;
          }
          p,
          ul li,
          ol li {
            font-family: arial, "helvetica neue", helvetica, sans-serif;
            line-height: 150%;
          }
          ul li,
          ol li {
            margin-bottom: 15px;
            margin-left: 0;
          }
          a {
            text-decoration: none;
          }
          .es-menu td a {
            text-decoration: none;
            display: block;
            font-family: arial, "helvetica neue", helvetica, sans-serif;
          }
          .es-menu amp-img,
          .es-button amp-img {
            vertical-align: middle;
          }
          .es-wrapper {
            width: 100%;
            height: 100%;
          }
          .es-wrapper-color,
          .es-wrapper {
            background-color: #eceff4;
          }
          .es-header {
            background-color: transparent;
          }
          .es-header-body {
            background-color: #ffffff;
          }
          .es-header-body p,
          .es-header-body ul li,
          .es-header-body ol li {
            color: #2e3440;
            font-size: 12px;
          }
          .es-header-body a {
            color: #2e3440;
            font-size: 12px;
          }
          .es-content-body {
            background-color: #ffffff;
          }
          .es-content-body p,
          .es-content-body ul li,
          .es-content-body ol li {
            color: #2e3440;
            font-size: 14px;
          }
          .es-content-body a {
            color: #2e3440;
            font-size: 14px;
          }
          .es-footer {
            background-color: transparent;
          }
          .es-footer-body {
            background-color: #d8dee9;
          }
          .es-footer-body p,
          .es-footer-body ul li,
          .es-footer-body ol li {
            color: #2e3440;
            font-size: 12px;
          }
          .es-footer-body a {
            color: #2e3440;
            font-size: 12px;
          }
          .es-infoblock,
          .es-infoblock p,
          .es-infoblock ul li,
          .es-infoblock ol li {
            line-height: 120%;
            font-size: 12px;
            color: #cccccc;
          }
          .es-infoblock a {
            font-size: 12px;
            color: #cccccc;
          }
          h1 {
            font-size: 40px;
            font-style: normal;
            font-weight: bold;
            color: #2e3440;
          }
          h2 {
            font-size: 24px;
            font-style: normal;
            font-weight: bold;
            color: #2e3440;
          }
          h3 {
            font-size: 20px;
            font-style: normal;
            font-weight: normal;
            color: #2e3440;
          }
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
            font-size: 40px;
          }
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
            font-size: 24px;
          }
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
            font-size: 20px;
          }
          a.es-button,
          button.es-button {
            padding: 10px 35px 10px 35px;
            display: inline-block;
            background: #fecd1c;
            border-radius: 30px;
            font-size: 18px;
            font-family: arial, "helvetica neue", helvetica, sans-serif;
            font-weight: bold;
            font-style: normal;
            line-height: 120%;
            color: #2e3440;
            text-decoration: none;
            width: auto;
            text-align: center;
          }
          .es-button-border {
            border-style: solid solid solid solid;
            border-color: #4c566a #4c566a #4c566a #4c566a;
            background: #fecd1c;
            border-width: 0px 0px 0px 0px;
            display: inline-block;
            border-radius: 30px;
            width: auto;
          }
          @media only screen and (max-width: 600px) {
            p,
            ul li,
            ol li,
            a {
              line-height: 150%;
            }
            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
              line-height: 120%;
            }
            h1 {
              font-size: 30px;
              text-align: center;
            }
            h2 {
              font-size: 24px;
              text-align: left;
            }
            h3 {
              font-size: 20px;
              text-align: left;
            }
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
              font-size: 30px;
              text-align: center;
            }
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
              font-size: 24px;
              text-align: left;
            }
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
              font-size: 20px;
              text-align: left;
            }
            .es-menu td a {
              font-size: 14px;
            }
            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
              font-size: 14px;
            }
            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
              font-size: 14px;
            }
            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
              font-size: 14px;
            }
            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
              font-size: 12px;
            }
            *[class="gmail-fix"] {
              display: none;
            }
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
              text-align: center;
            }
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
              text-align: right;
            }
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
              text-align: left;
            }
            .es-m-txt-r amp-img {
              float: right;
            }
            .es-m-txt-c amp-img {
              margin: 0 auto;
            }
            .es-m-txt-l amp-img {
              float: left;
            }
            .es-button-border {
              display: inline-block;
            }
            a.es-button,
            button.es-button {
              font-size: 18px;
              display: inline-block;
            }
            .es-adaptive table,
            .es-left,
            .es-right {
              width: 100%;
            }
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
              width: 100%;
              max-width: 600px;
            }
            .es-adapt-td {
              display: block;
              width: 100%;
            }
            .adapt-img {
              width: 100%;
              height: auto;
            }
            td.es-m-p0 {
              padding: 0;
            }
            td.es-m-p0r {
              padding-right: 0;
            }
            td.es-m-p0l {
              padding-left: 0;
            }
            td.es-m-p0t {
              padding-top: 0;
            }
            td.es-m-p0b {
              padding-bottom: 0;
            }
            td.es-m-p20b {
              padding-bottom: 20px;
            }
            .es-mobile-hidden,
            .es-hidden {
              display: none;
            }
            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
              width: auto;
              overflow: visible;
              float: none;
              max-height: inherit;
              line-height: inherit;
            }
            tr.es-desk-hidden {
              display: table-row;
            }
            table.es-desk-hidden {
              display: table;
            }
            td.es-desk-menu-hidden {
              display: table-cell;
            }
            .es-menu td {
              width: 1%;
            }
            table.es-table-not-adapt,
            .esd-block-html table {
              width: auto;
            }
            table.es-social {
              display: inline-block;
            }
            table.es-social td {
              display: inline-block;
            }
            .es-desk-hidden {
              display: table-row;
              width: auto;
              overflow: visible;
              max-height: inherit;
            }
            td.es-m-p5 {
              padding: 5px;
            }
            td.es-m-p5t {
              padding-top: 5px;
            }
            td.es-m-p5b {
              padding-bottom: 5px;
            }
            td.es-m-p5r {
              padding-right: 5px;
            }
            td.es-m-p5l {
              padding-left: 5px;
            }
            td.es-m-p10 {
              padding: 10px;
            }
            td.es-m-p10t {
              padding-top: 10px;
            }
            td.es-m-p10b {
              padding-bottom: 10px;
            }
            td.es-m-p10r {
              padding-right: 10px;
            }
            td.es-m-p10l {
              padding-left: 10px;
            }
            td.es-m-p15 {
              padding: 15px;
            }
            td.es-m-p15t {
              padding-top: 15px;
            }
            td.es-m-p15b {
              padding-bottom: 15px;
            }
            td.es-m-p15r {
              padding-right: 15px;
            }
            td.es-m-p15l {
              padding-left: 15px;
            }
            td.es-m-p20 {
              padding: 20px;
            }
            td.es-m-p20t {
              padding-top: 20px;
            }
            td.es-m-p20r {
              padding-right: 20px;
            }
            td.es-m-p20l {
              padding-left: 20px;
            }
            td.es-m-p25 {
              padding: 25px;
            }
            td.es-m-p25t {
              padding-top: 25px;
            }
            td.es-m-p25b {
              padding-bottom: 25px;
            }
            td.es-m-p25r {
              padding-right: 25px;
            }
            td.es-m-p25l {
              padding-left: 25px;
            }
            td.es-m-p30 {
              padding: 30px;
            }
            td.es-m-p30t {
              padding-top: 30px;
            }
            td.es-m-p30b {
              padding-bottom: 30px;
            }
            td.es-m-p30r {
              padding-right: 30px;
            }
            td.es-m-p30l {
              padding-left: 30px;
            }
            td.es-m-p35 {
              padding: 35px;
            }
            td.es-m-p35t {
              padding-top: 35px;
            }
            td.es-m-p35b {
              padding-bottom: 35px;
            }
            td.es-m-p35r {
              padding-right: 35px;
            }
            td.es-m-p35l {
              padding-left: 35px;
            }
            td.es-m-p40 {
              padding: 40px;
            }
            td.es-m-p40t {
              padding-top: 40px;
            }
            td.es-m-p40b {
              padding-bottom: 40px;
            }
            td.es-m-p40r {
              padding-right: 40px;
            }
            td.es-m-p40l {
              padding-left: 40px;
            }
          }
        </style>
      </head>
      <body data-new-gr-c-s-loaded="8.906.0">
        <div class="es-wrapper-color">
          <!--[if gte mso 9
            ]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#eceff4"></v:fill> </v:background
          ><![endif]-->
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td valign="top">
                <table
                  class="es-header"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                >
                  <tr>
                    <td align="center">
                      <table
                        class="es-header-body"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tr>
                          <td align="left">
                            <table width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="600" valign="top" align="center">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td style="position: relative" align="center">
                                        <a
                                          target="_blank"
                                          href="https://xeenon.online"
                                          ><amp-img
                                            class="adapt-img"
                                            src="https://snnfbh.stripocdn.email/content/guids/bannerImgGuid/images/image16894482419636649.png"
                                            alt
                                            title
                                            width="600"
                                            height="500"
                                            layout="responsive"
                                          ></amp-img
                                        ></a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                >
                  <tr>
                    <td align="center">
                      <table
                        class="es-content-body"
                        style="background-color: #ffffff"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tr>
                          <td class="es-p30t es-p40b es-p20r es-p20l" align="left">
                            <table width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="es-m-p0r" width="560" align="center">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="es-p20b" align="left">
                                        <p>
                                          Dear ${user}, <br />
                                          Congratulations! We are thrilled to inform
                                          you that your login was successful. <br />
                                          We appreciate your continued support and
                                          commitment to our platform. Your
                                          dedication contributes significantly to
                                          making our community stronger and more
                                          vibrant.
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="es-p20b" align="left">
                                        <p>
                                          As a valued member of our platform, you
                                          have access to a plethora of exciting
                                          features and resources. We encourage you
                                          to explore all the possibilities that
                                          await you here. Whether it's networking
                                          with like-minded individuals, discovering
                                          valuable content, or achieving your goals,
                                          we are here to support you every step of
                                          the way.
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="es-p20b" align="left">
                                        <p>
                                          Once again, congratulations on your
                                          successful login! We look forward to
                                          witnessing your continued growth and
                                          success within our community.
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-footer"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                >
                  <tr>
                    <td align="center">
                      <table
                        class="es-footer-body"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tr>
                          <td class="es-p20t es-p20r es-p20l" align="left">
                            <table width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td
                                  class="es-m-p0r es-m-p20b"
                                  width="560"
                                  valign="top"
                                  align="center"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="es-p20t es-p10b" align="center">
                                        <h1>Was this email helpful</h1>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="center">
                                        <p>
                                          Help us improve by completing this short
                                          survey.
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td class="es-p20t es-p40b es-p20r es-p20l" align="left">
                            <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="194" valign="top"><![endif]-->
                            <table
                              class="es-left"
                              cellspacing="0"
                              cellpadding="0"
                              align="left"
                            >
                              <tr>
                                <td
                                  class="es-m-p20b"
                                  width="174"
                                  valign="top"
                                  align="center"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="es-m-txt-c" align="right">
                                        <!--[if mso
                                          ]><a
                                            href="https://xeenon.online"
                                            target="_blank"
                                            hidden
                                          >
                                            <v:roundrect
                                              xmlns:v="urn:schemas-microsoft-com:vml"
                                              xmlns:w="urn:schemas-microsoft-com:office:word"
                                              esdevVmlButton
                                              href="https://xeenon.online"
                                              style="
                                                height: 41px;
                                                v-text-anchor: middle;
                                                width: 120px;
                                              "
                                              arcsize="50%"
                                              stroke="f"
                                              fillcolor="#fecd1c"
                                            >
                                              <w:anchorlock></w:anchorlock>
                                              <center
                                                style="
                                                  color: #2e3440;
                                                  font-family: arial,
                                                    'helvetica neue', helvetica,
                                                    sans-serif;
                                                  font-size: 15px;
                                                  font-weight: 700;
                                                  line-height: 15px;
                                                  mso-text-raise: 1px;
                                                "
                                              >
                                                Yes
                                              </center>
                                            </v:roundrect></a
                                          ><!
                                        [endif]-->
                                        <!--[if !mso]><!-- --><span
                                          class="es-button-border msohide"
                                          ><a
                                            href="https://xeenon.online"
                                            class="es-button"
                                            target="_blank"
                                            >Yes</a
                                          ></span
                                        >
                                        <!--<![endif]-->
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td class="es-hidden" width="20"></td>
                              </tr>
                            </table>
                            <!--[if mso]></td>
    <td width="173" valign="top"><![endif]-->
                            <table
                              class="es-left"
                              cellspacing="0"
                              cellpadding="0"
                              align="left"
                            >
                              <tr>
                                <td class="es-m-p20b" width="173" align="left">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td align="center">
                                        <!--[if mso
                                          ]><a
                                            href="https://xeenon.online"
                                            target="_blank"
                                            hidden
                                          >
                                            <v:roundrect
                                              xmlns:v="urn:schemas-microsoft-com:vml"
                                              xmlns:w="urn:schemas-microsoft-com:office:word"
                                              esdevVmlButton
                                              href="https://xeenon.online"
                                              style="
                                                height: 41px;
                                                v-text-anchor: middle;
                                                width: 145px;
                                              "
                                              arcsize="50%"
                                              stroke="f"
                                              fillcolor="#fecd1c"
                                            >
                                              <w:anchorlock></w:anchorlock>
                                              <center
                                                style="
                                                  color: #2e3440;
                                                  font-family: arial,
                                                    'helvetica neue', helvetica,
                                                    sans-serif;
                                                  font-size: 15px;
                                                  font-weight: 700;
                                                  line-height: 15px;
                                                  mso-text-raise: 1px;
                                                "
                                              >
                                                Maybe
                                              </center>
                                            </v:roundrect></a
                                          ><!
                                        [endif]-->
                                        <!--[if !mso]><!-- --><span
                                          class="es-button-border msohide"
                                          ><a
                                            href="https://xeenon.online"
                                            class="es-button"
                                            target="_blank"
                                            >Maybe</a
                                          ></span
                                        >
                                        <!--<![endif]-->
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td><td width="20"></td>
    <td width="173" valign="top"><![endif]-->
                            <table
                              class="es-right"
                              cellspacing="0"
                              cellpadding="0"
                              align="right"
                            >
                              <tr>
                                <td width="173" align="left">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="es-m-txt-c" align="left">
                                        <!--[if mso
                                          ]><a
                                            href="https://xeenon.online"
                                            target="_blank"
                                            hidden
                                          >
                                            <v:roundrect
                                              xmlns:v="urn:schemas-microsoft-com:vml"
                                              xmlns:w="urn:schemas-microsoft-com:office:word"
                                              esdevVmlButton
                                              href="https://xeenon.online"
                                              style="
                                                height: 41px;
                                                v-text-anchor: middle;
                                                width: 112px;
                                              "
                                              arcsize="50%"
                                              stroke="f"
                                              fillcolor="#fecd1c"
                                            >
                                              <w:anchorlock></w:anchorlock>
                                              <center
                                                style="
                                                  color: #2e3440;
                                                  font-family: arial,
                                                    'helvetica neue', helvetica,
                                                    sans-serif;
                                                  font-size: 15px;
                                                  font-weight: 700;
                                                  line-height: 15px;
                                                  mso-text-raise: 1px;
                                                "
                                              >
                                                No
                                              </center>
                                            </v:roundrect></a
                                          ><!
                                        [endif]-->
                                        <!--[if !mso]><!-- --><span
                                          class="es-button-border msohide"
                                          ><a
                                            href="https://xeenon.online"
                                            class="es-button"
                                            target="_blank"
                                            >No</a
                                          ></span
                                        >
                                        <!--<![endif]-->
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-footer"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                >
                  <tr>
                    <td align="center">
                      <table
                        class="es-footer-body"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tr>
                          <td class="es-p20t es-p20b es-p20r es-p20l" align="left">
                            <table width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="560" align="left">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td
                                        class="es-m-txt-c es-p20b"
                                        style="font-size: 0"
                                        align="center"
                                      >
                                        <table
                                          class="es-table-not-adapt es-social"
                                          cellspacing="0"
                                          cellpadding="0"
                                          role="presentation"
                                        >
                                        <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://www.facebook.com/Xeenonltd?mibextid=LQQJ4d" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:12px"><img title="Facebook" src="https://snnfbh.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                                        <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://t.me/XEENON_LTD" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:12px"><img title="Telgram" src="https://www.flaticon.com/free-icon/telegram_2111710?term=telegram&page=1&position=2&origin=search&related_id=2111710" alt="Tw" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                                        <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://instagram.com/hxtrad.ac?igshid=NGVhN2U2NjQ0Yg==" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:12px"><img title="Instagram" src="https://snnfbh.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                                        <td valign="top" align="center" style="padding:0;Margin:0"><a target="_blank" href="https://youtube.com/@xeenonltd?si=u_fD6AWnmmdVamjW" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:12px"><img title="Youtube" src="https://snnfbh.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>                                      
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="es-m-txt-c" align="center">
                                        <p>
                                          6305 Stony Bank, Pelican City, Montana,
                                          59436,US
                                          <a
                                            target="_blank"
                                            style="text-decoration: underline"
                                            >Unsubscribe</a
                                          >
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `;
};

export default template;
