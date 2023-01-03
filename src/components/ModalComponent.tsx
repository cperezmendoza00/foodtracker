import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Modal, Text } from 'react-native-paper'
import { globalStyles } from '../ui/globalStyles'
import { LocaleContext } from '../utils/LocaleContext'

interface Props {
  children: ReactElement
}

export default function ModalComponent({ children }: Props) {

  return (
    <Modal visible={true} onDismiss={() => { }} contentContainerStyle={styles.modal} >
      {children}
    </Modal>
  )
}


const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20
  }
});
