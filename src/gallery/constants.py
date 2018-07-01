from enum import Enum

ALBUM_ID = 'albumId'
JPEG = 'JPEG'
PK = 'pk'
AVATAR = "avatar"
RECOGNIZE_PEOPLE = 'recognizePeople'
LOCATION = "location"


class ProcessingStatus(Enum):
    INITIAL = 'Initial'
    IN_QUEUE = 'In queue'
    PROCESSING = 'Processing'
    PROCESSED = 'Processed'
    USER_DISABLED = 'User disabled'

    def __str__(self):
        return str(self.name)
