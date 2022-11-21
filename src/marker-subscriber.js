const { MarkerService } = require("./services/marker-service");
const zmq = require("zeromq");

module.exports = async function subscribe(tick) {
  const sock = new zmq.Subscriber();
  sock.connect("tcp://127.0.0.1:5556");
  sock.subscribe("status");

  console.log("Subscriber connected to port 5556");

  for await (const [topic, msg] of sock) {
    console.log(
      "received a message related to:",
      topic,
      "containing message:",
      JSON.parse(msg).Value
    );
    let markerService = new MarkerService();
    markerService.loadData(msg);

    for (let error of markerService.errors) {
      console.log(error.data.Id);
    }
    tick(markerService.getMarker);
  }
};
