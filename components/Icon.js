const Icon = ({name, className})=>{
    return (
        <div className={"material"}>
            <span className={"material-symbols-rounded " + className }>
                {name}
            </span>
        </div>
    )
}

export default Icon