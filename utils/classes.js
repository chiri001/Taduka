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
    marginTop: 5,
    marginBottom: 5,
    minHeight: '80vh',
    marginLeft: 3,
  },
  footer: {
    marginetop: 1,
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
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  fullWidth: {
    width: '100%',
  },
  visible: {
    display: 'initial',
  },
  hidden: {
    display: 'none',
  },
  searchForm: {
    border: '1px solid #000000',
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  searchInput: {
    paddingLeft: 1,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  searchButton: {
    paddingRight: 1,
    color: '#6a0dad',
  },

  halfWidth: {
    width: '90%',
  },
};

export default classes;
