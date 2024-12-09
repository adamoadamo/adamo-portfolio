import React from 'react'
import { wrapFieldsWithMeta } from "tinacms"

export const ImagePreview = wrapFieldsWithMeta(({ input, field }) => {
  const imagePath = input.value
  if (!imagePath) return null

  return (
    <div style={{ marginBottom: '1rem' }}>
      <img 
        src={imagePath} 
        alt="Preview"
        style={{
          maxWidth: '100%',
          maxHeight: '200px',
          objectFit: 'contain',
          marginBottom: '0.5rem'
        }}
      />
      {field.caption && (
        <div style={{ 
          fontSize: '0.875rem',
          color: 'var(--tina-color-grey-8)'
        }}>
          {field.caption}
        </div>
      )}
    </div>
  )
}) 