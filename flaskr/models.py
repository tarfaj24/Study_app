from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, LargeBinary
from flaskr.db import db


class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(30), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))

    def __repr__(self):
        return f"User(id={self.id}, name={self.username},password_hash={self.password_hash})"
