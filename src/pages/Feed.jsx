import { Card } from '../components'
import loader from '../assets/Rolling-0.4s-207px.svg'
import { useQuery } from 'react-query'
import { fetchData } from '../rapidApi'



const Feed = ({ setSpinner, spinner }) => {
    const { data, isError, isLoading, isSuccess } = useQuery('trending', fetchData)
    const list = data;
    const cardLoop =
        list?.map(el => {
            return el && <Card
                setSpinner={setSpinner}
                id={el?.videoId}
                spinner={spinner}
                key={Math.random() * 2000}
                dataObject={el}
            />
        })

    if (isLoading) return <div className='flex loading-spinner full' > <img src={loader} alt="Loading..." /></div >
    if (isError) return <h1>Error</h1>
    if (isSuccess)
        return (
            <>
                <div className="video-grid">
                    {cardLoop}
                </div>
            </>
        )
}

export default Feed;