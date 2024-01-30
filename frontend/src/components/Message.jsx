import { Alert } from  'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

const Message = ({ variant, message }) =>(
    // ! first code

        <Alert variant={variant}>
            {message}
            <Link className="btn btn-light my-3" to="/">go back</Link>
        </Alert>
    // <div>
    //     <h3>your cart is empty go back and fill it</h3><Link className="btn btn-light my-3" to="/">go back</Link>
    // </div>
)



Message.defaultProps = {
    variant: 'info',
}
export default Message