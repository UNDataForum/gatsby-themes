import { graphql } from 'gatsby';

import EventsPage from '../components/events-page';

export default EventsPage;

export const query = graphql`
  query($collection: String!) {
    allEvent(
      sort: { fields: startDate, order: DESC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        id
        title {
          text
        }
        displayDate
        duration
        moderators {
          name
        }
        speakers {
          name
        }
        description {
          childMdx {
            body
          }
        }
        registrationLink
        path
      }
    }
  }
`;
