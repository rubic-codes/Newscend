import HorizontalCard from './HorizontalCard'
import useAppContext from '../context/context'
import VerticalCard from './VerticalCard'
import fetchData from '../backend'

function Reports() {
    const { reportsResponse, reportsArray, setReportsResponse, isSmallScreen } = useAppContext()

    return (
        <>
            {reportsArray?.length > 0 ? (
                <>
                    <div className='lg:mx-[4vw] flex'>
                        <div className='md:min-w-[65vw] '>
                            {/* Every third (index) element of the array will be rendered in a vertical box */}
                            {isSmallScreen ?
                                reportsArray.map((element) => {
                                    return <HorizontalCard key={element.title} element={element} />
                                }) :
                                reportsArray.filter((e, index) => index % 3 !== 0 || index === 0).map((element) => {
                                    return <HorizontalCard key={element.title} element={element} />
                                })
                            }
                        </div>
                        <div className='hidden md:block'>
                            {reportsArray.map((element) => {
                                if (reportsArray.indexOf(element) % 3 !== 0 || reportsArray.indexOf(element) === 0) {
                                    return;
                                }
                                return <VerticalCard key={element.title} element={element} />
                            })}
                        </div>
                    </div>
                    <div className='w-screen flex justify-center py-5'>
                        <button
                            onClick={() => {
                                if (reportsResponse?.next) {
                                    fetchData(reportsResponse.next, setReportsResponse)
                                }
                                return
                            }}
                            className='font-onest text-2xl bg-indigo-500  text-white dark:bg-indigo-500 dark:shadow-lg dark:shadow-indigo-500/50 px-4 py-2 rounded hover:bg-indigo-600 dark:hover:bg-indigo-600 active:scale-95 transition-all duration-500'>Load more</button>
                    </div>
                </>

            ) : (
                <div className='h-[70vh] w-full text-2xl font-serif flex justify-center items-center'>error: No reports are available</div>
            )}

        </>
    )
}

export default Reports
