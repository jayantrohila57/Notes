{
  data?.map((note, index) => {
    return <Card key={index} title={note?.title} id={note?._id} dec={note?.description} />
  })
}
