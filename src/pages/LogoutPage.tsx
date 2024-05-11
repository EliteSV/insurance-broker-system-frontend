import { useEffect } from "react"
import { useAppDispatch } from "../store/hooks"
import { logout } from "../store/slices/authSlice"
import { useNavigate } from "react-router-dom"

function LogoutPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(logout())
        navigate('/')
    }, [dispatch, navigate])

    return (
        <></>
    )
}

export default LogoutPage