import AppHeader from "../Common/AppHeader";

export default function MainWrapper(props) {
    return <>
        <AppHeader />
        {props.children}
    </>
}
