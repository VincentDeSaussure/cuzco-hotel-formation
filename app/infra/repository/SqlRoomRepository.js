

class FilesRoomRepository {

    findAll() {
        return sql.query("select * from rooms");
    }
}