import { connect } from 'react-redux';

import LanguageActions from 'redux/Language/actions';

import LanguageSwitcher from 'components/Switcher/LanguageSwitcher';

const mapStateToProps = ({ Language }) => Language;

const mapDispatchToProps = LanguageActions;

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
