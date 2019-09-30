const MakeAResearch = require("./usecase/MakeAResearch");
const Request = require("./Request");
const RoomsRepository = require("./infra/repository/FilesRoomRepository");
const reservations = require("./infra/source/reservations");

const roomsRepository = new RoomsRepository();
const makeAResearch = new MakeAResearch(roomsRepository.findAll(), reservations);
const ENV = process.argv[2];

if (ENV == "prod") {
    console.log("running in prod")
} else {
    console.log("running in dev")
}

if (process.argv.length >= 5) {
    const request = new Request(process.argv[3], "2019-" + process.argv[4], "2019-" + process.argv[5]);
    console.log("request is : ", request.guestNumber, request.checkIn, request.checkOut);
    console.log(makeAResearch.execute(request.guestNumber, request.checkIn, request.checkOut));
} else {
    console.log("renseigner les parametres de votre recherche");
}
