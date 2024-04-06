import enum

class Role(enum.Enum):
    ADMIN = 0
    DEFAULT = 1
    TYPE_0 = 2

class AccessType(enum.Enum):
    PUBLIC = 0
    PRIVATE = 1