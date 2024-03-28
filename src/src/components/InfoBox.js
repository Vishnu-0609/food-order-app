export default function InfoBox({children,className=""})
{
    return(
        <div className='max-w-xl mx-auto'>
            <h2 className={`text-center p-4 rounded-lg border ${className}`}>{children}</h2>
        </div>
    )
}