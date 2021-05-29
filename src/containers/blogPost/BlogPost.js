import React, { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import raw from "raw.macro"
import { useHistory } from "react-router-dom";

export default ({ match: { params: { id } } }) => {
  const [mdText, setMdText] = useState("")
  const history = useHistory()
  useEffect(() => {
    const blogPostMd = raw(`../../blog/${id}.md`)
    if (id && !blogPostMd) history.replace("/")
    setMdText(blogPostMd)
  }, [id, history])
  return (
    <ReactMarkdown>{mdText}</ReactMarkdown>
  )
}