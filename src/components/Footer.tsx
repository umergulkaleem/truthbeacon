export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-100 via-white to-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-600">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-800">TruthBeacon</span>. Built
          for{" "}
          <span className="font-semibold text-blue-600">
            Katy Youth Hacks 2025
          </span>
          .
        </p>

        {/* Optional social links / credits */}
        <div className="mt-2 flex justify-center gap-4 text-gray-500 text-xs">
          <a
            target="_blank"
            href="https://github.com/umergulkaleem/truthbeacon"
            className="hover:underline"
          >
            GitHub
          </a>
          {/* <a href="#" className="hover:underline">Privacy Policy</a> */}
        </div>
      </div>
    </footer>
  );
}
