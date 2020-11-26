import { config, server } from "../config";
import log from "./logger";
const nodemailer = require("nodemailer");

export default {
  sendProjectFinished(recipient, project, success) {
    const transporter = nodemailer.createTransport({
      host: config.emailServer,
      port: config.emailPort,
      secure: config.emailPort === 465, // true for 465, false for other ports
      auth: {
        user: config.emailUser,
        pass: config.emailPasswd,
      },
      tls: {
        rejectUnauthorized: false, // do not fail on invalid certs
      },
    });

    const projectLink = `${server.serverUrl}/project/${project}`;
    const videoLink = `${server.serverUrl}/project/${project}/finished`;

    const email = {
      from: '"차윤성" <cys77135@naver.com>',
      to: recipient,
      subject: "RCV - 동영상 렌더링 완료", // Subject line
    };

    if (success) {
      email.html = `<p>비디오 렌더링이 끝났습니다 <a href="${projectLink}">프로젝트</a>.</p>
				<p>다음 링크에서 다운로드 할 수 있습니다: <a href="${videoLink}">${videoLink}</a></p>
				<p>페이지에 비디오를 포함하는 코드:</p>
				<pre>&lt;video controls src="${videoLink}" /&gt;</pre>`;
    } else {
      email.to += `, ${config.adminEmail}`;
      email.html = `<p>당신의 <a href="${projectLink}">프로젝트를</a>처리 할 수 없습니다</p>
				<p>불편을 드려 죄송합니다. 가능한 한 빨리 문제를 해결하겠습니다</p>`;
    }

    transporter.sendMail(email, (err) => {
      if (err)
        log.error(`Email to ${recipient} (project ${project}) failed!`, err);
      else {
        log.info(`Email send to: "${recipient}"`);
      }
    });
  },
};
