import { useState } from 'react';
import Link from 'next/link';

export async function getStaticPaths() {
  const data = require('../../public/bounties.json').challenges;
  return {
    paths: data.map((bounty) => {
      return {
        params: { id: bounty.challengeId },
      };
    }),
    fallback: false,
  };
}

export function getStaticProps(context) {
  const id = context.params.id;
  const bounty = require('../../public/bounties.json').challenges.find(
    (bounty) => bounty.challengeId === id
  );

  return {
    props: { bounty },
  };
}

const Bounty = ({ bounty }) => {
  const description = bounty.description
    .replace(/<p>|<\/p>/g, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\n+/g, '\n')
    .trim();
  const acceptanceCriteria = bounty.acceptanceCriteria
    .replace(/<p>|<\/p>/g, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\n+/g, '\n')
    .trim();

  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-green-900 rounded-lg p-2 mt-3 mb-6 w-fit">
        <Link href="/">Back</Link>
      </div>
      <h1 className="text-xl font-bold">{bounty.name}</h1>
      <h4 className="text-xl mt-6">Description</h4>
      <p className="whitespace-pre-wrap">{description}</p>
      <h4 className="text-xl mt-6">Acceptance criteria</h4>
      <p className="whitespace-pre-wrap">{acceptanceCriteria}</p>
      <h4 className="text-xl mt-6">Rewards</h4>
      {bounty.rewardPool ? (
        <p>{bounty.rewardPool} reward pool</p>
      ) : (
        <ul>
          {bounty.rewards.map((reward, i) => (
            <li key={i}>
              {i + 1}: {reward.rewardAmountUsd} USD {reward.rewardText}
            </li>
          ))}
        </ul>
      )}

      {bounty.resources && (
        <dl>
          {bounty.resources.map(({description, resourceUrl}) => (
            <>
              <dt>{description}</dt>
              <dd><a href={resourceUrl} target="_blank">{resourceUrl}</a></dd>
            </>
          ))}
        </dl>
      )}

      <button
        className="bg-green-900 rounded-lg p-2 mt-3"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide' : 'Show all info'}
      </button>

      {show && <p>{JSON.stringify(bounty)}</p>}
    </>
  );
};

export default Bounty;
