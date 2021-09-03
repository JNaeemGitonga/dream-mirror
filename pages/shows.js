import { useEffect, useState } from 'react';
import Layout from '@c/Layout';
import { Grid, Card } from '@c/Grid';
import { Title } from '@c/Title';
import { getAllShows } from '@l/graphcms';
import SortingBar from '@c/SortingBar';

export default function Shows({ shows }) {
  const [sortedShows, setSortedShows] = useState([...shows]);
  const handleSort = (order, name) => {
    if (name.includes('name')) {
      order === 'asc' &&
        setSortedShows([
          ...shows.sort((a, b) => a.title.localeCompare(b.title)),
        ]);
      order === 'desc' &&
        setSortedShows([
          ...shows.sort((a, b) => b.title.localeCompare(a.title)),
        ]);
      return;
    }

    order === 'asc' &&
      setSortedShows([
        ...shows.sort(
          (a, b) =>
            new Date(a.scheduledStartTime) - new Date(b.scheduledStartTime)
        ),
      ]);
    order === 'desc' &&
      setSortedShows([
        ...shows.sort(
          (a, b) =>
            new Date(b.scheduledStartTime) - new Date(a.scheduledStartTime)
        ),
      ]);
  };

  return (
    <Layout title='next-graphcms-shows / Shows'>
      <Title>Shows</Title>
      <Grid>
        <SortingBar setSortOrder={handleSort} />
      </Grid>
      <Grid>
        {sortedShows.map((show) => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
          </Card>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  const shows = (await getAllShows()) || [];
  return {
    props: { shows },
  };
}
