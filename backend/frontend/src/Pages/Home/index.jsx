import Feature from '../../Components/Feature'
import Footer from '../../Components/Footer'
import Hero from '../../Components/Hero'
import Nav from '../../Components/Nav'
import './home.scss'

/**
 * landing page
 * @component
 * @returns {JSX.Element}
 */
const Home = () => {
   /**
    * array of values for the features
    * @array
    */
   const value = [
      {
         img: '/img/icon-chat.png',
         title: 'You are our #1 priority',
         text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
      },
      {
         img: '/img/icon-money.png',
         title: 'More savings means higher rates',
         text: 'The more you save with us, the higher your interest rate will be!',
      },
      {
         img: '/img/icon-security.png',
         title: 'Security you can trust',
         text: 'We use top of the line encryption to make sure your data and money is always safe.',
      },
   ]

   return (
      <>
         <Nav />
         <main className="main">
            <Hero />
            <section className="features">
               <Feature
                  src={value[0].img}
                  title={value[0].title}
                  text={value[0].text}
               />
               <Feature
                  src={value[1].img}
                  title={value[1].title}
                  text={value[1].text}
               />
               <Feature
                  src={value[2].img}
                  title={value[2].title}
                  text={value[2].text}
               />
            </section>
         </main>
         <Footer />
      </>
   )
}

export default Home
