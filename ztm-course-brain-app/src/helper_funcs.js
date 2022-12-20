onRouteChange = (route) => {
    if (route === "SignedOut") {
      this.setState({ isSigned: false });
    }
    else if (route === "Home") {
      this.setState({ isSigned: true });
    }

    this.setState({ mRoute: route });
  }

  