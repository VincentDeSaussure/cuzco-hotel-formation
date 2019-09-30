const rooms = require('../source/rooms')


class FilesRoomRepository {

    findAll() {
        return rooms;
    }
}


module.exports = FilesRoomRepository;