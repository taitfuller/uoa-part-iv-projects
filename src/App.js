import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core';

import Projects from './Projects'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  nav: {
    color: theme.palette.getContrastText(theme.palette.info.dark),
    backgroundColor: theme.palette.info.dark,
  },
  appBarSpacer: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Specialisations',
        accessor: 'specialisations',
      },
      {
        Header: 'Categories',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },
    ],
    []
  )

  const data = React.useMemo(
    () => [
      {
        id: 1,
        title: "Using large screen displays to support understanding program code",
        url: "https://part4project.foe.auckland.ac.nz/home/project/detail/2940/",
        description: [
          "Trying to understand a large, unknown computer codebase is a challenging task. Currently, developers use Integrated Development Environments (IDEs) to navigate through a codebase whilst trying to connect different parts of the system together. Another approach would be to use people's spatial abilities to help with this process, but most computer screens are not large enough to display several code files simultaneously. This project will develop a huge screen viewer/editor that allows programmers to visualise multiple program files at the same time. It will use the large wall display in the centre for e-research to visualise the code."
        ],
        outcomes: [
          "User study of how developers read code on large screens",
          "Development of a web-based system to display multiple code files on a huge-screen system",
          "Evaluation and analysis of the impact of using the system on code comprehension"
        ],
        prerequisites: [],
        specialisations: ["Software Engineering"],
        categories: [
          "Software Development Tools and Processes 1",
          "Software Development Tools and Processes 2"
        ],
        supervisors: ["Craig Sutherland"],
        cosupervisors: []
      },
      {
        id: "2",
        title: "Tangible-based Programming Environment for Robots",
        url: "https://part4project.foe.auckland.ac.nz/home/project/detail/2941/",
        description: [
          "Children are often fascinated with robots and want to control (program) them. Currently, most programming environments are screen-based, requiring the use of either a mouse and keyboard or a touch screen. This project will investigate the use of physical coding blocks (tangibles) as an alternative approach to programming robots. The project will involve developing the programming environment and evaluating it with children."
        ],
        outcomes: [
          "Refinement of a web and tangible block-based programming system",
          "Evaluation of the system with school-aged children"
        ],
        prerequisites: [],
        specialisations: ["Software Engineering"],
        categories: ["Games & Education Aids 1", "Games & Education Aids 2"],
        supervisors: ["Craig Sutherland"],
        cosupervisors: []
      },
    ],
    []
  )

  return (
    <div>
    <CssBaseline />
      <AppBar className={classes.nav}>
        <Toolbar>
          <Typography variant="h6">2021 Projects</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Projects />
        </Container>
      </main>
    </div>
  )
}

export default App
