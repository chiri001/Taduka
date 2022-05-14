//adds classes for website layout

const classes = {
  section: {
    margineTop: 1,
    marginBottom: 1,
  },

  smallText: {
    fontSize: '15px',
  },

  main: {
    marginTop: 2,
    minHeight: '80vh',
  },
  footer: {
    margineTop: 1,
    textAlign: 'center',
  },
  appbar: {
    '& a': {
      color: '#4b0096',
      marginLeft: 1,
    },
  },

  toolbar: {
    justifyContent: 'space-between',
  },
  brand: {
    fontWeight: 'hold',
    fontSize: '1.5rem',
  },

  navbarButton: {
    color: '#ffffff',
    texttTransform: 'initial',
  },
};

export default classes;
