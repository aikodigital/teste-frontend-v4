import { Avatar, Box } from '@mui/material'
import './style.scss'

export default function LeftMenu() {
  return (
    <Box className="left-menu">
      <span className="left-menu__logo">Logo</span>
      <div className="left-menu__icons">
        <Avatar className="left-menu__avatar--square" variant="square">
          &nbsp;
        </Avatar>
        <Avatar className="left-menu__avatar--square" variant="square">
          &nbsp;
        </Avatar>
        <Avatar className="left-menu__avatar--square" variant="square">
          &nbsp;
        </Avatar>
        <Avatar className="left-menu__avatar--square" variant="square">
          &nbsp;
        </Avatar>
        <Avatar className="left-menu__avatar--circle">&nbsp;</Avatar>
      </div>
    </Box>
  )
}
