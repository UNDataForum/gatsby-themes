import React from "react";
import PropTypes from "prop-types";
import { Link } from "@undataforum/components";

const A = ({ children, href }) => <Link href={href}>{children}</Link>;

A.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired
};

export default A;
