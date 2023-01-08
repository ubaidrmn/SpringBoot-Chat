const ContentWrapper = props => {
    return <>
        <div style={{
            maxWidth: props.width !== undefined ? props.width : "100%",
            width:"100%",
            paddingLeft:"100px",
            paddingRight:"100px",
            boxSizing: "border-box",
            margin: "0px auto"
        }}>
            {props.children}
        </div>
    </>
}

export default ContentWrapper;