import { Link, Typography } from "@mui/material"
import "../assets/scss/copyright.scss"

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" className="copyright">
            {'Copyright © '}
            <Link color="inherit" href="https://handmall.az/">
                Handmall
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
   
}

export default Copyright