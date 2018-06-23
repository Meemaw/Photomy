from enum import Enum

ALBUM_ID = 'albumId'
JPEG = 'JPEG'
PK = 'pk'
AVATAR = "avatar"
RECOGNIZE_PEOPLE = 'recognizePeople'


class ProcessingStatus(Enum):
    INITIAL = 'Initial'
    IN_QUEUE = 'In queue'
    PROCESSING = 'Processing'
    PROCESSED = 'Processed'
    USER_DISABLED = 'User disabled'
