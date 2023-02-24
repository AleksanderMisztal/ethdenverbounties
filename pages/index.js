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
    <table>
      <thead>
        <tr>
          <th className="text-left">Bounties</th>
          <th className="text-left">Sponsor</th>
          <th className="text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        {bounties.map((project) => (
          <tr key={project.id}>
            <td className="text-left font-normal whitespace-nowrap">
              {project.rewards} USD
            </td>
            <td className="text-left font-normal whitespace-nowrap">
              {project.org}
            </td>
            <td className="text-left font-normal whitespace-nowrap">
              <a href={`/bounty/${project.id}`}>{project.name}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
