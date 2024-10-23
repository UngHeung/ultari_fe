function getLastModifiedDate(createAt?: string, updateAt?: string) {
  if (!createAt || !updateAt) {
    return {
      title: '',
      date: '',
    };
  }

  return {
    title: createAt === updateAt ? '작성일' : '수정일',
    date: createAt === updateAt ? createAt : updateAt,
  };
}

export default getLastModifiedDate;
