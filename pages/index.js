export async function getStaticProps(context) {
  const data = require('../public/bounties.json');
  const bounties = data.challenges.map((bounty) => ({
    name: bounty.name,
    org: bounty.submittedByOrgName,
    id: bounty.challengeId,
    rewards:
      bounty.rewardPool ||
      bounty.rewards.reduce(
        (partialSum, a) => partialSum + parseInt(a.rewardAmountUsd),
        0
      ),
  }));
  bounties.sort((a, b) => b.rewards - a.rewards);
  return {
    props: { bounties },
  };
}

export default function Home({ bounties }) {
  return (
    <table className="inline-block whitespace-nowrap text-left">
      <thead>
        <tr>
          <th>Bounties</th>
          <th>Sponsor</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {bounties.map((project) => (
          <tr key={project.id}>
            <td className="font-normal">{project.rewards} USD</td>
            <td className="font-normal">{project.org}</td>
            <td className="font-normal">
              <a href={`/bounty/${project.id}`}>{project.name}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
