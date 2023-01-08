const VerticalAlign = props => {
    return <>
        <div style={{maxWidth:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center", height: "100%", maxHeight: "100%"}}>
            {props.children}
        </div>
    </>
}

export default VerticalAlign;
