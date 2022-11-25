import { Fragment, useState, useEffect, Component} from 'react';
import UsersContext from '../store/user-context';
import ErrorBoundary from "./ErrorBoundary";
import Users from './Users';
import classes from './UserFinder.module.css';
/*
to use context api in class component either you use constumer or static word so this
context belong to this class you cannot use more than one context in aclass or use reserved
word static typeContext = your contect then use it this.context.xourContext
*/
const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component{
    static contextType = UsersContext;
    constructor(){
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ''
        };
    }
    componentDidMount() {
        // Send http request...
        this.setState({ filteredUsers: this.context.users });
      }
          // here i need if to avoid infinity loop this if in instead of dependency in useeffect

      componentDidUpdate(prevProps, prevState){
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
              filteredUsers: DUMMY_USERS.filter((user) =>
                user.name.includes(this.state.searchTerm)
              ),
            });
          }
        }
        searchChangeHandler(event) {
            this.setState({ searchTerm: event.target.value });
          }
          render() {
            return (
              <Fragment>
                <div className={classes.finder}>
                  <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                <ErrorBoundary>
                  <Users users={this.state.filteredUsers} />
                </ErrorBoundary>
              </Fragment>
            );
          }
        }


/*const UserFinder = () => {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };
  

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
};*/

export default UserFinder;