(function () {
  let dataConnection = null;
  const listPeersButtonEl = document.querySelector(".list-all-peers-button");
  const peersEl = document.querySelector(".peers");
  const sendButtonEL = document.querySelector(".send-new-message-button");
  const newMessageEL = document.querySelector(".new-message");
  const messagesEl = document.querySelector(".messages");

  const printMessage = (text) => {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.innerHTML = `<div>${text}</div>`;
    messagesEl.append(messageContainer);
  };

  // Get peer id (hash) from URL
  const myPeerId = location.hash.slice(1);

  // Connect to Peer server
  let peer = new Peer(myPeerId, {
    host: "glajan.com",
    port: 8443,
    path: "/myapp",
    secure: true,
    config: {
      iceServers: [
        { urls: ["stun:eu-turn7.xirsys.com"] },
        {
          username:
            "1FOoA8xKVaXLjpEXov-qcWt37kFZol89r0FA_7Uu_bX89psvi8IjK3tmEPAHf8EeAAAAAF9NXWZnbGFqYW4=",
          credential: "83d7389e-ebc8-11ea-a8ee-0242ac140004",
          urls: [
            "turn:eu-turn7.xirsys.com:80?transport=udp",
            "turn:eu-turn7.xirsys.com:3478?transport=udp",
            "turn:eu-turn7.xirsys.com:80?transport=tcp",
            "turn:eu-turn7.xirsys.com:3478?transport=tcp",
            "turns:eu-turn7.xirsys.com:443?transport=tcp",
            "turns:eu-turn7.xirsys.com:5349?transport=tcp",
          ],
        },
      ],
    },
  });

  // Print peerId on connection "open" event
  peer.on("open", (id) => {
    const myPeerIdEl = document.querySelector(".my-peer-id");
    myPeerIdEl.innerText = id;
  });

  peer.on("error", (errorMessage) => {
    console.error(errorMessage);
  });

  // On incoming connection
  peer.on("connection", (connection) => {
    dataConnection = connection;
    dataConnection.on("data", (textMessage) => {
      printMessage(textMessage);
    });

    const event = new CustomEvent("peer-changed", {
      detail: connection.peer,
    });
    document.dispatchEvent(event);
  });

  // Second and final code with map
  listPeersButtonEl.addEventListener("click", () => {
    peer.listAllPeers((peers) => {
      peersEl.innerHTML = "";

      const listItems = peers
        .filter((peerId) => peerId !== peer._id)
        .map(
          (peer) =>
            `<li><button class= "connect-button peerId-${peer}">${peer}</button></li>`
        )
        .join("");
      const ul = "<ul>" + listItems + "<ul>";
      peersEl.innerHTML = ul;
    });
  });

  // Event listener for click on peer button
  peersEl.addEventListener("click", (event) => {
    // Only listen to click on button
    if (!event.target.classList.contains("connect-button")) return;

    // Get peerId from button element
    const theirPeerId = event.target.innerText;

    // Close existing connection
    dataConnection && dataConnection.close();

    // Connect to peer
    dataConnection = peer.connect(theirPeerId);

    dataConnection.on("data", (textMessage) => {
      printMessage(textMessage);
    });

    dataConnection.on("open", () => {
      // Dispatch Custom Event with connected peerId
      const event = new CustomEvent("peer-changed", {
        detail: theirPeerId,
      });
      document.dispatchEvent(event);
    });
  });

  // Event listener for custom event "peer-changed"
  document.addEventListener("peer-changed", (event) => {
    const peerId = event.detail;
    const connectButtonEl = document.querySelector(
      `.connect-button.peerId-${peerId}`
    );

    // Remove class connected from button
    document.querySelectorAll(".connect-button.connected").forEach((button) => {
      button.classList.remove("connected");
    });
    // Add class "connected" to clicked button
    connectButtonEl.classList.add("connected");
  });

  // Event listener for click on "send"
  sendButtonEL.addEventListener("click", () => {
    if (!dataConnection) return;
    dataConnection.send(newMessageEL.value);
    printMessage(newMessageEL.value);
  });
})();
