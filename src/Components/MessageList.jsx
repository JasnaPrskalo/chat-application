import React from "react";

export default function Messages({ messages, thisMember }) {

  function renderMessage(message, index) {
    console.log('index: ' +  index )
    const { member, data, id } = message;
    const thisMemberMsg = member.id === thisMember.id;
    const classNameLi = thisMemberMsg 
      ? "message-list_msg message-list_msg--thisMember"
      : "message-list_msg";

    const classNameMemberData = thisMemberMsg
      ? "message-list_member-data message-list_member-data--thisMember"
      : "message-list_member-data";

    return (
      <li className={classNameLi} key={id} data-id={member.id}>
        <div className="message-list_msg-container">
          <div className={classNameMemberData}>
            <span className="message-list_username">
              {member.clientData.username}
            </span>
          </div>
          <div className="message-list_text">{data}</div>
        </div>
      </li>
    );
  }

  return (
    <ul className="message-list">
      {messages.map((m, index) => renderMessage(m, index))}
      {/* console.log( {'Mapirana  poruka' + messages.length}); console.log({'index poruke' + currentUser.index}); */}
    </ul>
  );
}
