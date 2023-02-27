import { Fragment } from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'

export default function Layout(props) {

  return (
    <>
        <ResponsiveAppBar />
        <main>{props.children}</main>
    </>
  )
}