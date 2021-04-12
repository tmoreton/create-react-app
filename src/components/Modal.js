import React from 'react'
import Rodal from 'rodal'

export default function Modal({ visible, closeModal, title, children }) {
  return (
    <Rodal
      customStyles={{ width: '65%', height: '75%' }}
      visible={visible}
      onClose={closeModal}
    >
      <div className="container-fluid h-100" style={{ overflow: 'scroll' }}>
        <h4>{title}</h4>
        {children}
      </div>
    </Rodal>
  )
}
