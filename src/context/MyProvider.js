import MyContext from './MyContext';
import {isAuthenticated} from '../authentication/helper/auth';

class MyProvider extends Component {
    state = {
        isAuthUser : false
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    isAuthUser: this.state.isAuthUser,
                    checkAuthentication: () => {
                        let isAuthUser = isAuthenticated();
                        this.setState({
                            isAuthUser
                        });
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}