import React from 'react';
// import { Form } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase,{providerFacebook} from '../Firebase/config';

class SignUp extends React.Component {

    state = {
        loading: false, //処理中にボタンにspinner表示する制御用
    }

    _isMounted = false;

    //Submitされたら
    handleOnSubmit = (values) => {
        //spinner表示開始
        if (this._isMounted) this.setState({ loading: true });
        //新規登録処理
        firebase.auth().signInWithRedirect(providerFacebook)
            .then(res => {
                //正常終了時
                //spinner表示終了
                if (this._isMounted) this.setState({ loading: false });
                //Homeに移動
                this.props.history.push("./"); //history.pushを使うためwithRouterしている
            })
            .catch(error => {
                //異常終了時
                if (this._isMounted) this.setState({ loading: false });
                alert(error);
            });
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="container">
                <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                    <p style={{ textAlign: 'center' }}>新規登録</p>
                    <Formik
                        initialValues={{ email: '', password: '', tel: '' }}
                        onSubmit={(values) => this.handleOnSubmit(values)}
                    >
                        {
                            ({ handleSubmit }) => (
                                <Form onClick={handleSubmit}>
                                    
                                    <div style={{ textAlign: 'center' }}>
                                        <Button color="success" type="submit" disabled={this.state.loading}>
                                            <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading} />
                                            新規登録
                                        </Button>
                                    </div>
                                    
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                    <Link to="/signin">ログインはこちら。</Link>
                    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
                </div>

            </div>
        );
    }
}

export default withRouter(SignUp);