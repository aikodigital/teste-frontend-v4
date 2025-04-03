import { Outlet } from "react-router-dom"
import { LayoutContainer } from "./styles"

export function DefaultLayout() {
  return(
    <div>
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    </div>
  )
}