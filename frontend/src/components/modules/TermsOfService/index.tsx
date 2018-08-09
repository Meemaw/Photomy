import * as React from 'react';
import { Container } from 'semantic-ui-react';

import Address from './Address';
import ContentLiability from './ContentLiability';
import Cookies from './Cookies';
import Disclaimer from './Disclaimer';
import Hyperlinking from './Hyperlinking';
import Iframes from './Iframes';
import Licence from './Licence';
import LinkRemovals from './LinkRemovals';
import ReservationOfRights from './ReservationOfRights';

const TermsOfService = (props: object) => (
  <Container text className="TermsOfService" style={{ marginTop: '25px' }}>
    <h1>Welcome to Photomy</h1>
    <p>
      These terms and conditions outline the rules and regulations for the use of Photomy's Website.
    </p>
    <br />
    <span> Photomy</span> is and can be cantacted at:
    <Address />
    <br />
    <br />
    <p>
      By accessing this website we assume you accept these terms and conditions in full. Do not
      continue to use Photomy's website if you do not accept all of the terms and conditions stated
      on this page.
    </p>
    <p>
      The following terminology applies to these Terms and Conditions, Privacy Statement and
      Disclaimer Notice and any or all Agreements: “Client”, “You” and “Your” refers to you, the
      person accessing this website and accepting the Company’s terms and conditions. “The Company”,
      “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers
      to both the Client and ourselves, or either the Client or ourselves. All terms refer to the
      offer, acceptance and consideration of payment necessary to undertake the process of our
      assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed
      duration, or any other means, for the express purpose of meeting the Client’s needs in respect
      of provision of the Company’s stated services/products, in accordance with and subject to,
      prevailing law of . Any use of the above terminology or other words in the singular, plural,
      capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring
      to same.
    </p>
    <Cookies />
    <Licence />
    <Hyperlinking />
    <Iframes />
    <ReservationOfRights />
    <LinkRemovals />
    <ContentLiability />
    <Disclaimer />
  </Container>
);

export default TermsOfService;
