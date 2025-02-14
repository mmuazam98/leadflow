from typing import Generic, TypeVar, Optional, Dict
from pydantic.generics import GenericModel

T = TypeVar("T")


class Response(GenericModel, Generic[T]):
    data: T


class ResponseWithMeta(GenericModel, Generic[T]):
    data: T
    meta: Optional[Dict] = None
