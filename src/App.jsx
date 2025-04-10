import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState("")
  const [gallery, setGallery] = useState([])

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file))

    const res = await axios.post("https://api-inference.huggingface.co/models/your-model-name", file, {
      headers: {
        Authorization: "Bearer YOUR_HF_TOKEN",
        "Content-Type": file.type
      }
    })

    const captionText = res.data?.[0]?.generated_text || "No caption generated"
    setCaption(captionText)
    setGallery([{ image: URL.createObjectURL(file), caption: captionText }, ...gallery])
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#0077cc' }}>🖼️ PicScribe</h1>
      <p>Turn your images into words with AI</p>

      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '1rem' }} />}
      {caption && <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>{caption}</p>}

      <div id="ad-space" style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed #ccc' }}>
        [Ad space placeholder]
      </div>

      <h2 style={{ marginTop: '3rem' }}>📷 Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {gallery.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '0.5rem', width: '150px' }}>
            <img src={item.image} alt="Gallery" style={{ width: '100%' }} />
            <p style={{ fontSize: '0.8rem' }}>{item.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
