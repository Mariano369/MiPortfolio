import baseClasses from '@components/Themes/layout.module.scss'
import { Email, GitHub, LinkedIn, WhatsApp } from '@mui/icons-material'
import LinkIcon from '@mui/icons-material/Link'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { loadTools, searchTools } from '@store/actions/toolsActions'
import { IState } from '@store/reducers/index'
import MiPortfoliomodulescss from 'dist/css/MiPortfolio.module.scss'
import React, { FunctionComponent } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Landing: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const theme = { ...baseClasses, ...MiPortfoliomodulescss }
  const allTools = useSelector((state: IState) => state.tools).tools
  const toolsData = useSelector((state: IState) => state.tools)
  const dispatch = useDispatch()
  const [LoadfromDatabaseloadoptions, setLoadfromDatabaseloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performLoadfromDatabaseload = (options) => {
    dispatch(options.searchString ? searchTools(options) : loadTools(options))
  }
  React.useEffect(() => {
    performLoadfromDatabaseload({
      ...LoadfromDatabaseloadoptions,
    })
  }, [LoadfromDatabaseloadoptions])

  // Theme selection

  const Projects = () => {
    const headerElement = document.getElementById('projects')
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const Scroll = () => {
    const footerElement = document.getElementById('final')
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  React.useEffect(() => {}, [])

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <div data-title="Header" className={theme.header}>
          <Container className={theme.headerContainer} maxWidth="lg">
            <Grid container item xs={12} sm={12} md={5} lg={5} className={theme.headerGrid}>
              <Typography variant="h6">Hello, I'm</Typography>

              <Typography variant="h1">Mariano Godoy</Typography>

              <Typography variant="h6" className={theme.profesion}>
                Full Stack Developer
              </Typography>

              <div data-title="div" className={theme.buttonPrincipal}>
                <a target="_blank" href="https://drive.google.com/file/d/14tAzEgYz9GZocqCpPUS6ZeKSGSDQeRGe/view?usp=sharing">
                  <Button variant="contained" color="primary" className={theme.buttonUno}>
                    Download CV
                  </Button>
                </a>

                <NavLink to="#final">
                  <Button
                    variant="contained"
                    color="primary"
                    onClickCapture={(e) => {
                      Scroll()
                    }}
                    className={theme.buttonDos}
                  >
                    Lets Talk
                  </Button>
                </NavLink>
              </div>

              <div data-title="div" className={theme.contenedorImageyRedes}>
                <div data-title="div" className={theme.imagePerfil}>
                  <picture className={theme.profileImage}>
                    <img
                      src="/img/WhatsApp Image 2024-06-09 at 01,39,43 (1l)_processed.jpg"
                      alt="/img/WhatsApp Image 2024-06-09 at 01,39,43 (1l)_processed.jpg"
                      width="470"
                      height="427"
                    />
                  </picture>
                </div>

                <div data-title="div" className={theme.containerIconos}>
                  <div data-title="div" className={theme.divRedesPrincipal1}>
                    <a
                      target="_blank"
                      href="https://github.com/Mariano369
"
                    >
                      <GitHub color="primary" sx={{}} />
                    </a>

                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/mariano-martín-godoy-lopez/
"
                    >
                      <LinkedIn color="primary" sx={{}} />
                    </a>

                    <a
                      target="_blank"
                      href="mailto:marianomartingl@gmail.com
"
                    >
                      <Email color="primary" sx={{}} />
                    </a>
                  </div>
                </div>
              </div>
            </Grid>

            <div data-title="div" className={theme.myProjects}>
              <Typography variant="h3">My Projects</Typography>
            </div>

            <Carousel
              height={500}
              navButtonsAlwaysVisible={true}
              autoPlay={true}
              sx={{ width: 550 }}
              indicators={true}
              navButtonsAlwaysInvisible={false}
              animation="fade"
            >
              <div data-title="div" id="projects" className={theme.imagen}>
                <picture>
                  <img src="/img/hazBackground.jpeg" alt="/img/hazBackground.jpeg" width="370" height="320" />
                </picture>

                <a target="_blank" href="https://github.com/mariano369">
                  <Button
                    variant="contained"
                    color="primary"
                    onClickCapture={(e) => {
                      setsnackbar(true)
                    }}
                    className={theme.buttonGoProyect}
                    startIcon={<LinkIcon />}
                  >
                    Go to the project
                  </Button>
                </a>
              </div>

              <div data-title="div" className={theme.imagen}>
                <picture>
                  <img src="/img/hazBackground.jpeg" alt="/img/hazBackground.jpeg" width="370" height="320" />
                </picture>

                <a target="_blank" href="https://github.com/mariano369">
                  <Button
                    variant="contained"
                    color="primary"
                    onClickCapture={(e) => {
                      setsnackbar(true)
                    }}
                    className={theme.buttonGoProyect}
                    startIcon={<LinkIcon />}
                  >
                    Go to the project
                  </Button>
                </a>
              </div>

              <div data-title="div" className={theme.imagen}>
                <picture>
                  <img src="/img/hazBackground.jpeg" alt="/img/hazBackground.jpeg" width="370" height="320" />
                </picture>

                <a target="_blank" href="https://github.com/mariano369">
                  <Button
                    variant="contained"
                    color="primary"
                    onClickCapture={(e) => {
                      setsnackbar(true)
                    }}
                    className={theme.buttonGoProyect}
                    startIcon={<LinkIcon />}
                  >
                    Go to the project
                  </Button>
                </a>
              </div>

              <div data-title="div" className={theme.imagen}>
                <picture>
                  <img src="/img/hazBackground.jpeg" alt="/img/hazBackground.jpeg" width="370" height="320" />
                </picture>

                <a target="_blank" href="https://github.com/mariano369">
                  <Button
                    variant="contained"
                    color="primary"
                    onClickCapture={(e) => {
                      setsnackbar(true)
                    }}
                    className={theme.buttonGoProyect}
                    startIcon={<LinkIcon />}
                  >
                    Go to the project
                  </Button>
                </a>
              </div>
            </Carousel>
            <div data-title="div" className={theme.toolsTitle}>
              <Typography variant="h3">Tools</Typography>
            </div>

            <div data-title="div" className={theme.headerTools}>
              <div data-title="Tools List" className={theme.toolsContent}>
                {allTools.map((item, index) => {
                  return (
                    <React.Fragment key={'GRCWZhfz_' + index}>
                      <Typography variant="body1">{item.Name}</Typography>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </Container>
        </div>

        <div data-title="AboutMe" className={theme.aboutMe}>
          <Container className={theme.aboutMeContainer}>
            <div data-title="div" className={theme.aboutMeDiv}>
              <Typography variant="h6">Get to Know</Typography>

              <Typography variant="h3">About Me</Typography>
            </div>

            <Container className={theme.containerCards}>
              <div data-title="divImagen" className={theme.aboutMeCards}>
                <picture className={theme.image}>
                  <img
                    src="/img/WhatsApp Image 2024-06-09 at 01,39,43 (1l)_processed.jpg"
                    alt="/img/WhatsApp Image 2024-06-09 at 01,39,43 (1l)_processed.jpg"
                    width="370"
                    height="327"
                  />
                </picture>
              </div>

              <div data-title="divTarjetas" className={theme.divTarjetas}>
                <div data-title="Card" className={theme.aboutCard}>
                  <picture className={theme.img}>
                    <img src="/img/icons8-medalla-100.png" alt="/img/icons8-medalla-100.png" width="22" height="35" />
                  </picture>

                  <Typography variant="h6">Experience</Typography>

                  <Typography variant="h6">
                    <span className={theme.subtitle1}>0+ years</span>
                  </Typography>
                </div>

                <div data-title="Card" className={theme.aboutCard}>
                  <picture className={theme.img}>
                    <img src="/img/icons8-portafolio-64.png" alt="/img/icons8-portafolio-64.png" width="22" height="35" />
                  </picture>

                  <Typography variant="h6">Projects</Typography>

                  <Typography variant="subtitle1">
                    <span className={theme.subtitle1}>3+ Completed</span>
                  </Typography>
                </div>

                <div data-title="Card" className={theme.aboutCard}>
                  <picture className={theme.img}>
                    <img src="/img/icons8-clientes-100.png" alt="/img/icons8-clientes-100.png" width="22" height="35" />
                  </picture>

                  <Typography variant="h6">Clients</Typography>

                  <Typography variant="subtitle1">
                    <span className={theme.subtitle1}>3</span>
                  </Typography>
                </div>
              </div>
            </Container>

            <Container className={theme.aboutDescription}>
              <div data-title="div" className={theme.description}>
                <Typography variant="h6">
                  I'm a 29 years old trainee Full Stack Web Developer looking forward to give my first steps in software development on a company that
                  allows me to enhance my professional growth and potentiate my skills
                </Typography>
              </div>

              <div data-title="div" className={theme.buttonLetStalk}>
                <NavLink to="#final">
                  <Button
                    variant="contained"
                    color="primary"
                    onClickCapture={(e) => {
                      Scroll()
                    }}
                    className={theme.buttonUno}
                  >
                    Lets Talk
                  </Button>
                </NavLink>
              </div>
            </Container>

            <div data-title="div" className={theme.experienceTitle}>
              <Typography variant="h6">What Skills Do I Have</Typography>

              <Typography variant="h3">My experience</Typography>
            </div>

            <Container className={theme.ContainerFrontBack}>
              <div data-title="Card" className={theme.aboutUltimasCards}>
                <Typography variant="h6">Frontend Development</Typography>
              </div>

              <div data-title="Card" className={theme.aboutUltimasCards}>
                <Typography variant="h6">Backend Development</Typography>
              </div>
            </Container>
          </Container>
        </div>
      </div>

      <div data-title="Footer" id="final" className={theme.footer}>
        <div data-title="div" className={theme.contactDiv}>
          <Typography variant="h6">Get In Touch</Typography>

          <Typography variant="h3">Contact Me</Typography>
        </div>

        <Container className={theme.containerIcons}>
          <div data-title="div" className={theme.buttonFooter1}>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/mariano-martín-godoy-lopez/
"
            >
              <LinkedIn color="primary" sx={{}} />
            </a>

            <Typography variant="subtitle1" className={theme.redesSubtitle1}>
              LinkedIn
            </Typography>

            <Typography variant="subtitle2" className={theme.redesNombre}>
              marianogodoy
            </Typography>

            <a target="_blank" href="https://www.linkedin.com/in/mariano-martín-godoy-lopez/">
              <Button
                variant="text"
                color="primary"
                onClickCapture={(e) => {
                  setsnackbar(true)
                }}
                className={theme.iconMyProfileButton}
              >
                My LinkedIn Profile
              </Button>
            </a>
          </div>

          <div data-title="divWhatsappPrincipal" className={theme.divWhatsappPirncipal}>
            <a target="_blank" className={theme.whatsappLink} href="https://walink.co/a9e37d">
              <WhatsApp color="primary" className={theme.whatsappIcon} sx={{}} />
            </a>
          </div>

          <div data-title="div" className={theme.buttonFooter2}>
            <a
              target="_blank"
              href="mailto:marianomartingl@gmail.com
"
            >
              <Email color="primary" sx={{}} />
            </a>

            <Typography variant="subtitle1" className={theme.redesSubtitle1}>
              Email
            </Typography>

            <Typography variant="subtitle2" className={theme.redesNombre}>
              marianomartingl@gmail.com
            </Typography>

            <a target="_blank" href="mailto:marianomartingl@gmail.com">
              <Button variant="text" color="primary" className={theme.iconMyProfileButton}>
                Send me an email
              </Button>
            </a>
          </div>

          <div data-title="div" className={theme.buttonFooter2}>
            <a
              target="_blank"
              href="https://github.com/Mariano369
"
            >
              <GitHub color="primary" sx={{}} />
            </a>

            <Typography variant="subtitle1" className={theme.redesSubtitle1}>
              GitHub
            </Typography>

            <Typography variant="subtitle2" className={theme.redesNombre}>
              mariano369
            </Typography>

            <a target="_blank" href="https://github.com/Mariano369">
              <Button variant="text" color="primary" className={theme.iconMyProfileButton}>
                My GitHub Profile
              </Button>
            </a>
          </div>
        </Container>

        <Typography variant="body1">MyPortfolio. 2024 all rights reserved</Typography>
      </div>
    </React.Fragment>
  )
}

export default Landing
