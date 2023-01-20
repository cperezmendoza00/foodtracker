import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Modal, Text } from 'react-native-paper'
import { globalStyles } from '../ui/globalStyles'
import { LocaleContext } from '../utils/LocaleContext'

interface Props {
  children: ReactElement
  visible: boolean
}

export default function ModalComponent({ children, visible }: Props) {

  return (
    <Modal
      visible={visible}
      onDismiss={() => { }}
      contentContainerStyle={styles.content}
      style={styles.modal}>
      {children}
    </Modal>
  )
}


const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0

  },
  content: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    flex: 1,
    //padding: 20,
    //margin: 0

  }
});
